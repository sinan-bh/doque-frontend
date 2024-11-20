"use client";

import React, { useState } from "react";
import Onboarding from "@/components/ui/onboarding/onboarding";
import SpaceNameStep from "@/components/ui/onboarding/spaceNameStep";
import BoardNameStep from "@/components/ui/onboarding/boardNameStep";
import TaskNameStep from "@/components/ui/onboarding/taskNamesStep";
import ReadyPage from "@/components/ui/onboarding/readyPage";
import Cookies from "js-cookie";

export default function Page() {
  const firstName = JSON.parse(Cookies.get("user") || "{}")?.firstName;

  const [step, setStep] = useState(0);
  const [spaceName, setSpaceName] = useState(
    firstName ? `${firstName}'s workspace` : ""
  );
  const [boardName, setBoardName] = useState("");

  const [taskCategories, setTaskCategories] = useState({
    todo: "ToDo",
    doing: "Doing",
    completed: "Completed",
  });

  const handleContinue = () => {
    setStep(1);
  };

  const handleSpaceNameNext = (name: string) => {
    setSpaceName(name);
    setStep(2);
  };

  const handleBoardNameNext = (name: string) => {
    setBoardName(name);
    setStep(3);
  };

  const handleBack = () => {
    setStep((prevStep) => prevStep - 1);
  };

  const handleTaskNameNext = () => {
    setStep(4);
  };

  const handleTaskCategoryChange = (name: string, value: string) => {
    setTaskCategories((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div>
      {step === 0 && <Onboarding onContinue={handleContinue} />}
      {step === 1 && (
        <SpaceNameStep onNext={handleSpaceNameNext} initialName={spaceName} />
      )}
      {step === 2 && (
        <BoardNameStep
          previousName={spaceName}
          onNext={handleBoardNameNext}
          onBack={handleBack}
          initialName={boardName}
        />
      )}
      {step === 3 && (
        <TaskNameStep
          previousSpaceName={spaceName}
          previousBoardName={boardName}
          onBack={handleBack}
          taskCategories={taskCategories}
          onTaskCategoryChange={handleTaskCategoryChange}
          onNext={handleTaskNameNext}
        />
      )}
      {step === 4 && (
        <ReadyPage spaceName={boardName} listName={taskCategories} />
      )}
    </div>
  );
}
