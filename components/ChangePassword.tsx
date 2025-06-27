import { useState, Dispatch, SetStateAction } from "react";
import { View, Text } from "react-native";
import VerifyPasswordForm from "./VerifyPasswordForm";
import NewPasswordForm from "./NewPasswordForm";
import SuccessfullyChangedPasswordMessage from "./SuccessfullyChangedPasswordMessage";
import { SetTabProps } from "../app/(tabs)/Profile";

export type ChangePasswordProps = {
  setStep: Dispatch<SetStateAction<string>>;
  setErrorMessage: Dispatch<SetStateAction<string>>;
  errorMessage: string;
};

export default function ChangePassword({ setSelectedTab }: SetTabProps) {
  const [step, setStep] = useState("verify");
  const [errorMessage, setErrorMessage] = useState("");

  return (
    <View>
      {step === "verify" && (
        <VerifyPasswordForm
          setStep={setStep}
          setErrorMessage={setErrorMessage}
          errorMessage={errorMessage}
        />
      )}

      {step === "update" && (
        <NewPasswordForm
          setStep={setStep}
          setErrorMessage={setErrorMessage}
          errorMessage={errorMessage}
        />
      )}

      {step === "success" && (
        <SuccessfullyChangedPasswordMessage setSelectedTab={setSelectedTab} />
      )}
    </View>
  );
}
