import { ContestSnapshot, RoundSnapshot, SeriesSnapshot, ParticipantSnapshot } from '../models';
import moment from 'moment';

export function normalizeContest(contest: any): ContestSnapshot {
  return {
    id: contest.id,
    type: contest.type,
    name: contest.name,
    password: contest.password,
    startTime: Date.parse(contest.start_time),
    endTime: Date.parse(contest.end_time),
    rounds: [],
    status: 'offline',
  };
}

export function normalizeContestRounds(round: any, contestId: number): RoundSnapshot {
  return {
    contestId,
    id: round.id,
    startTime: round.start_time,
    endTime: round.end_time,
    roundNumber: round.round_no,
    series: [],
    status: 'not-loaded',
  };
}

export function normalizeRoundSeries(series: any): SeriesSnapshot {
  return {
    id: series.id,
    startTime: series.start_time,
    endTime: series.end_time,
    seriesNumber: series.jseries_no,
    participants: [],
  };
}

export function normalizeParticipant(participant: any): ParticipantSnapshot {
  return {
    id: participant.id,
    startTime: participant.start_time,
    endTime: participant.end_time,
    contestId: participant.vote,
    firstName: participant.first_name,
    lastName: participant.last_name,
    voted: false,
  };
}

export type TimeStatus = 'finished' | 'in-progress' | 'not-started';

export const getTimeStatus = (
  item: RoundSnapshot | ParticipantSnapshot | SeriesSnapshot,
): TimeStatus => {
  const startDate = moment(item.startTime);
  const endDate = moment(item.endTime);

  const presentMoment = moment();
  const isInProgress: boolean = presentMoment.isBetween(startDate, endDate);
  if (isInProgress) {
    return 'in-progress';
  }
  const timeDifference = presentMoment.diff(endDate);
  if (timeDifference > 0) {
    return 'finished';
  }
  return 'not-started';
};
