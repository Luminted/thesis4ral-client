export const getRejoinErrorMessage = (reason: string) => `Could not rejoin table: ${reason}`;
export const getJoinErrorMessage = (reason: string) => `Error while joining table: ${reason}`;
export const getLeaveTableErrorMessage = (reason: string) => `Error while leaving table: ${reason}`;
export const getVerbErrorMessage = (reason: string, verbType: string) => `Error while performing verb: ${verbType}: ${reason}`