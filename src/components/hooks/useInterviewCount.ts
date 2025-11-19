import { useQuery } from "@tanstack/react-query";
import { getInterviewCount } from "../../services/interviewService";
import { getTotalInterviewTime } from "../../services/interviewService";

export function useInterviewCount() {
  return useQuery({
    queryKey: ["interview-count"],
    queryFn: getInterviewCount,
    staleTime: 1000 * 60 * 5,
  });
}

export function useInterviewTime() {
  return useQuery({
    queryKey: ["interview-total-time"],
    queryFn: getTotalInterviewTime,
    staleTime: 1000 * 60 * 10, // 10 minutes cache
  });
}