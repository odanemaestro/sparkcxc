import React from "react";
import { act, fireEvent, render, screen } from "@testing-library/react";
import EnglishAPaper2Exam from "../englishA/practice/EnglishAPaper2Exam";
import { readServerExamClock, submitServerExamAttempt } from "./serverExamAttempt";

jest.mock("./serverExamAttempt",()=>({
  ...jest.requireActual("./serverExamAttempt"),
  readServerExamClock:jest.fn(), submitServerExamAttempt:jest.fn(),startServerExamAttempt:jest.fn(),
}));
jest.mock("../subjects/subjectProgress",()=>({recordSubjectActivity:jest.fn().mockResolvedValue({})}));

beforeEach(()=>{
  jest.useFakeTimers();
  localStorage.clear();
  window.scrollTo=jest.fn();
  jest.clearAllMocks();
});
afterEach(()=>jest.useRealTimers());

test("clock expiry submits the latest typed answer without polling on keystrokes",async()=>{
  const now=Date.now();
  localStorage.setItem("spark-english-a-paper2-timer-test-v2",JSON.stringify({
    phase:"exam",setId:"A",answers:{},choiceId:"",currentIndex:0,
    endsAt:now+600000,serverAttemptId:"attempt",startedAt:new Date(now).toISOString(),
  }));
  readServerExamClock.mockResolvedValueOnce({available:true,server_now:new Date(now).toISOString(),deadline_at:new Date(now+600000).toISOString()});
  readServerExamClock.mockResolvedValue({available:true,expired:true,server_now:new Date(now+600000).toISOString(),deadline_at:new Date(now+600000).toISOString()});
  submitServerExamAttempt.mockResolvedValue({available:true});
  await act(async()=>{render(<EnglishAPaper2Exam userId="timer-test" supabase={{}} onBack={()=>{}}/>);});
  const boxes=screen.getAllByRole("textbox");
  fireEvent.change(boxes[0],{target:{value:"The latest response must survive timed submission."}});
  fireEvent.change(boxes[0],{target:{value:"Updated answer at expiry."}});
  expect(readServerExamClock).toHaveBeenCalledTimes(1);
  await act(async()=>{jest.advanceTimersByTime(30000);});
  expect(submitServerExamAttempt).toHaveBeenCalledTimes(1);
  expect(Object.values(submitServerExamAttempt.mock.calls[0][0].responses)).toContain("Updated answer at expiry.");
});
