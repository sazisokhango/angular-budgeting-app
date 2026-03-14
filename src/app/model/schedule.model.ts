export interface ScheduleModel {
    id: number,
    recurrencePattern: string,
    startDate: Date | null,
    endDate: Date | null,
    active: boolean
}