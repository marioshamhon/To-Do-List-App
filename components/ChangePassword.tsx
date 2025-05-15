import { useState, Dispatch, SetStateAction } from "react";
import { View, Text } from "react-native";
import VerifyPasswordForm from "./VerifyPasswordForm";
import NewPasswordForm from "./NewPasswordForm";
import SuccessfullyChangedPasswordMessage from "./SuccessfullyChangedPasswordMessage";
import { SetTabProps } from "../app/(tabs)/Profile";

export type ChangePasswordProps = {
  setStep: Dispatch<SetStateAction<string>>;
  setErrorMessage: Dispatch<SetStateAction<string>>;
};

export default function ChangePassword({ setSelectedTab }: SetTabProps) {
  const [step, setStep] = useState("verify");
  const [errorMessage, setErrorMessage] = useState("");

  return (
    <View>
      {errorMessage ? (
        <Text className="text-red-500 text-center mb-1">{errorMessage}</Text>
      ) : null}
      {step === "verify" && (
        <VerifyPasswordForm
          setStep={setStep}
          setErrorMessage={setErrorMessage}
        />
      )}

      {step === "update" && (
        <NewPasswordForm setStep={setStep} setErrorMessage={setErrorMessage} />
      )}

      {step === "success" && (
        <SuccessfullyChangedPasswordMessage setSelectedTab={setSelectedTab} />
      )}
    </View>
  );
}
