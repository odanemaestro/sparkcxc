import React from "react";
import {act, fireEvent, render, screen, waitFor} from "@testing-library/react";
import {DashboardView} from "./App";
import {supabase} from "./lib/supabaseClient";

jest.mock("./lib/supabaseClient", () => ({
  supabase:{from:jest.fn(), rpc:jest.fn(), channel:jest.fn(), removeChannel:jest.fn()},
}));
jest.mock("./rewards/useSparkRewardsDashboard", () => ({
  __esModule:true,
  default:() => ({data:null, loading:false, error:""}),
}));

const mathematics = {
  id:"mathematics", name:"CSEC Mathematics", shortName:"Mathematics", enabled:true,
  capabilities:{study:true, practice:true, progress:true, flashcards:false},
  routes:{study:"/study/mathematics", practice:"/practice/mathematics"},
  stats:{topics:20},
};

function queryResult(data) {
  const query = {};
  for (const method of ["select", "eq", "order", "limit"]) query[method] = () => query;
  query.maybeSingle = () => Promise.resolve({data:data[0] || null, error:null});
  query.then = (resolve, reject) => Promise.resolve({data, error:null}).then(resolve, reject);
  return query;
}

function renderDashboard(setView = jest.fn()) {
  const rendered = render(<DashboardView
    user={{id:"student-1"}}
    profile={{id:"student-1", role:"student", name:"Odane Robinson"}}
    setView={setView}
    showToast={jest.fn()}
    subjects={[mathematics]}
  />);
  return {setView, ...rendered};
}

describe("dashboard next-step recommendation tracking", () => {
  afterEach(() => jest.restoreAllMocks());

  beforeEach(() => {
    window.history.replaceState(null, "", "#/dashboard");
    sessionStorage.clear();
    window.scrollTo = jest.fn();
    supabase.from.mockImplementation(table => queryResult({
      spark_student_subject_enrollments:[{student_id:"student-1", subject_id:"mathematics", status:"active"}],
      spark_learner_skill_state:[{
        skill:"Sets & Venn Diagrams", mastery_probability:0.3, confidence:0.1,
        evidence_count:1, last_practised_at:new Date().toISOString(),
      }],
    }[table] || []));
    supabase.rpc.mockImplementation(name => Promise.resolve({
      data:name === "spark_get_learning_recommendation_history" || name === "spark_recommendation_effectiveness_signal_v2" ? [] : null,
      error:null,
    }));
    supabase.channel.mockImplementation(() => {
      const channel = {on:() => channel, subscribe:() => channel};
      return channel;
    });
  });

  test("records the clicked snapshot once and opens its target without waiting for the RPC", async () => {
    let complete;
    const pending = new Promise(resolve => { complete = resolve; });
    const originalRpc = supabase.rpc.getMockImplementation();
    supabase.rpc.mockImplementation((name, params) => name === "spark_record_learning_recommendation"
      ? pending
      : originalRpc(name, params));
    const {setView} = renderDashboard();
    const button = await screen.findByRole("button", {name:"Start practice"});

    fireEvent.click(button);
    fireEvent.click(button);

    expect(button).not.toBeDisabled();
    expect(screen.queryByText("Opening…")).not.toBeInTheDocument();
    expect(setView).toHaveBeenCalledTimes(1);
    expect(setView).toHaveBeenCalledWith("practice-math");
    const calls = supabase.rpc.mock.calls.filter(([name]) => name === "spark_record_learning_recommendation");
    expect(calls).toHaveLength(1);
    expect(calls[0][1]).toEqual(expect.objectContaining({
      p_subject_id:"mathematics",
      p_skill_key:"Sets & Venn Diagrams",
      p_action_type:"baseline",
      p_baseline_mastery:30,
      p_metadata:expect.objectContaining({
        recommendation_key:expect.any(String),
        target_key:expect.any(String),
        target:expect.objectContaining({subjectId:"mathematics", view:"practice-math"}),
        expected_minutes:10,
        phase:"learning_loop_v3",
        strategy_id:expect.any(String),
      }),
    }));

    await act(async () => { complete({data:"recommendation-1", error:null}); });

    expect(setView).toHaveBeenCalledTimes(1);
    expect(setView).toHaveBeenCalledWith("practice-math");
    expect(window.location.hash).toContain("skill=Sets");
    await waitFor(() => expect(screen.getByRole("button", {name:/Start practice|Open the lesson/})).not.toBeDisabled());
    // The new start immediately enters history and lowers this recommendation's rank.
    expect(screen.queryByText("Try a short practice on Sets & Venn Diagrams")).not.toBeInTheDocument();
  });

  test("a permission error cannot block the student from opening practice", async () => {
    const originalRpc = supabase.rpc.getMockImplementation();
    const warning = jest.spyOn(console, "warn").mockImplementation(() => {});
    supabase.rpc.mockImplementation((name, params) => name === "spark_record_learning_recommendation"
      ? Promise.resolve({data:null, error:{code:"42501", message:"Permission denied"}})
      : originalRpc(name, params));
    const {setView} = renderDashboard();

    fireEvent.click(await screen.findByRole("button", {name:"Start practice"}));

    await waitFor(() => expect(setView).toHaveBeenCalledWith("practice-math"));
    expect(warning).toHaveBeenCalledWith("Could not record SPARK recommendation", expect.objectContaining({code:"42501"}));
    expect(screen.getByRole("button", {name:"Start practice"})).not.toBeDisabled();
    warning.mockRestore();
  });

  test("a rejected recording request cannot delay or reopen the original activity", async () => {
    const originalRpc = supabase.rpc.getMockImplementation();
    const warning = jest.spyOn(console, "warn").mockImplementation(() => {});
    supabase.rpc.mockImplementation((name, params) => name === "spark_record_learning_recommendation"
      ? Promise.reject(new Error("Network unavailable"))
      : originalRpc(name, params));
    const {setView} = renderDashboard();

    fireEvent.click(await screen.findByRole("button", {name:"Start practice"}));

    await waitFor(() => expect(setView).toHaveBeenCalledWith("practice-math"));
    expect(screen.getByRole("button", {name:"Start practice"})).not.toBeDisabled();
    expect(warning).toHaveBeenCalled();
    warning.mockRestore();
  });

  test("resolving a pending start cannot override a later dashboard navigation", async () => {
    let complete;
    const pending = new Promise(resolve => { complete = resolve; });
    const originalRpc = supabase.rpc.getMockImplementation();
    supabase.rpc.mockImplementation((name, params) => name === "spark_record_learning_recommendation"
      ? pending
      : originalRpc(name, params));
    const {setView} = renderDashboard();

    fireEvent.click(await screen.findByRole("button", {name:"Start practice"}));
    expect(setView).toHaveBeenCalledTimes(1);
    fireEvent.click(screen.getByRole("button", {name:"My subjects"}));
    expect(screen.getByRole("button", {name:"My subjects"})).toHaveAttribute("aria-current", "page");
    const selectedRoute = window.location.hash;

    await act(async () => { complete({data:"recommendation-1", error:null}); });

    expect(setView).toHaveBeenCalledTimes(1);
    expect(window.location.hash).toBe(selectedRoute);
    expect(screen.getByRole("button", {name:"My subjects"})).toHaveAttribute("aria-current", "page");
  });

  test("resolving after the dashboard unmounts cannot cause late navigation", async () => {
    let complete;
    const pending = new Promise(resolve => { complete = resolve; });
    const originalRpc = supabase.rpc.getMockImplementation();
    supabase.rpc.mockImplementation((name, params) => name === "spark_record_learning_recommendation"
      ? pending
      : originalRpc(name, params));
    const {setView, unmount} = renderDashboard();

    fireEvent.click(await screen.findByRole("button", {name:"Start practice"}));
    unmount();
    window.history.replaceState(null, "", "#/practice");

    await act(async () => { complete({data:"recommendation-1", error:null}); });

    expect(setView).toHaveBeenCalledTimes(1);
    expect(window.location.hash).toBe("#/practice");
  });

  test("a never-settling recording request leaves practice and other navigation available", async () => {
    const originalRpc = supabase.rpc.getMockImplementation();
    supabase.rpc.mockImplementation((name, params) => name === "spark_record_learning_recommendation"
      ? new Promise(() => {})
      : originalRpc(name, params));
    const {setView} = renderDashboard();

    fireEvent.click(await screen.findByRole("button", {name:"Start practice"}));

    expect(setView).toHaveBeenCalledWith("practice-math");
    expect(screen.queryByText("Opening…")).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", {name:"Quick practice"}));
    expect(setView).toHaveBeenLastCalledWith("practice");
    expect(setView).toHaveBeenCalledTimes(2);
  });
});
