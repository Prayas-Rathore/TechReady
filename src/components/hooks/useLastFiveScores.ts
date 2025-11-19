import { useQuery } from "@tanstack/react-query";
import { getLastFiveScores } from "../../services/interviewService";

export function useLastFiveScores() {
  return useQuery({
    queryKey: ["last-five-scores"],
    queryFn: getLastFiveScores,
    staleTime: 1000 * 60 * 5,
  });
}
