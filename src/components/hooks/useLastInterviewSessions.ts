import { useQuery } from "@tanstack/react-query";
import { getLastFiveInterviewSessions } from "../../services/interviewService";

export function useLastInterviewSessions() {
  return useQuery({
    queryKey: ["last-five-interview-sessions"],
    queryFn: getLastFiveInterviewSessions,
    staleTime: 1000 * 60 * 5,
  });
}
