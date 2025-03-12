import { memo, useEffect } from "react";
import { useLocation } from "react-router-dom";

interface PageTitleProps {
  title: string;
}

export const PageTitle = memo((props: PageTitleProps) => {
  const location = useLocation();

  useEffect(() => {
    document.title = props.title + " | DXG Attendance";
  }, [props.title, location]);

  return null;
});
