import React from "react";
import { Spinner } from "../spinner/Spinner";
import { Button } from "../ui/button";

type AppButtonState = "Active" | "Loading" | "Disabled";
type ShadcnButtonVariant =
  | "default"
  | "destructive"
  | "outline"
  | "secondary"
  | "ghost"
  | "link"
  | null
  | undefined;

interface AppButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: ShadcnButtonVariant;
  state?: AppButtonState;
  loadingText?: string;
}

export const AppButton = ({
  children,
  variant,
  state,
  loadingText,
  ...rest
}: AppButtonProps) => {
  if (state !== undefined && state == "Loading") {
    return (
      <Button
        {...rest}
        variant={variant}
        className={rest.className + " relative"}
        disabled
      >
        <Spinner />
        {loadingText !== undefined ? loadingText : children}
      </Button>
    );
  }

  return (
    <Button {...rest} variant={variant} disabled={state === "Disabled"}>
      {children}
    </Button>
  );
};
