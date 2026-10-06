import { useCallback, useEffect, useRef, useState } from "react";

export const SPARK_REWARDS_SETUP_MESSAGE = "SPARK Rewards are getting ready. Apply the rewards database migration to activate this card.";

export default function useSparkRewardsDashboard({
  supabase,
  viewerUserId,
  subjectUserId = null,
  enabled = true,
} = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(Boolean(enabled));
  const [error, setError] = useState("");
  const [savingPreference, setSavingPreference] = useState(false);
  const [showLeaders, setShowLeaders] = useState(false);
  const mounted = useRef(true);
  const loadedKey = useRef("");

  useEffect(() => {
    mounted.current = true;
    return () => { mounted.current = false; };
  }, []);

  const load = useCallback(async () => {
    if (!enabled || !supabase || !viewerUserId) return;
    const key = viewerUserId + ":" + (subjectUserId || "");
    if (loadedKey.current !== key) {
      setData(null);
      setLoading(true);
    }
    const { data: payload, error: rpcError } = await supabase.rpc("spark_get_rewards_dashboard", {
      p_student_id: subjectUserId || null,
    });
    if (!mounted.current) return;
    if (rpcError) {
      console.error("Failed to load SPARK Rewards:", rpcError);
      setError(SPARK_REWARDS_SETUP_MESSAGE);
      setData(null);
      loadedKey.current = "";
    } else {
      setError("");
      setData(payload || null);
      loadedKey.current = key;
    }
    setLoading(false);
  }, [enabled, supabase, viewerUserId, subjectUserId]);

  useEffect(() => { load(); }, [load]);

  const setLeaderboardVisible = useCallback(async nextVisible => {
    if (!supabase || savingPreference) return false;
    setSavingPreference(true);
    const { error: rpcError } = await supabase.rpc("spark_set_reward_preferences", {
      p_leaderboard_visible: Boolean(nextVisible),
    });
    if (rpcError) console.error("Failed to update SPARK Rewards privacy:", rpcError);
    else await load();
    if (mounted.current) setSavingPreference(false);
    return !rpcError;
  }, [supabase, savingPreference, load]);

  return { data, loading, error, reload:load, savingPreference, setLeaderboardVisible, showLeaders, setShowLeaders };
}
