import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

interface WithTooltipProps {
  children: React.ReactNode;
  content: string;
}

export const WithTooltip = ({ children, content }: WithTooltipProps) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>{children}</TooltipTrigger>
        <TooltipContent>
          <p>{content}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
