import { SubmitAttendanceForm } from "./SubmitAttendance.Form";

export const SubmitAttendancePage = () => {
  return (
    <main className="p-5">
      <h1 className="text-3xl mb-5">Working remotely today?</h1>
      <h2 className="text-2xl mb-10">
        Submit your Attendance for:{" "}
        <span className="font-bold">{new Date().toDateString()}</span>
      </h2>
      <SubmitAttendanceForm />
    </main>
  );
};
