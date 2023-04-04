import GitHubIcon from "@mui/icons-material/GitHub";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import { useCurrentUser } from "hooks/useCurrentUser";
import GitlabIcon from "components/atoms/icons/GitlabIcon";

export function useVcsIcon() {
  const { vcsType } = useCurrentUser();

  switch (vcsType) {
    case "github":
      return GitHubIcon;
    case "gitlab":
      return GitlabIcon;
    default:
      return QuestionMarkIcon;
  }
}
