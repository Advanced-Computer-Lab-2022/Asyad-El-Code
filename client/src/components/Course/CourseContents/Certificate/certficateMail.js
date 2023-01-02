export const certificateMail = (user, course) => {
  return (
    <div id="report" class="certificate">
      <div class="header">Certificate of Completion</div>
      <div class="subheader">for successfully completing the course</div>
      <div class="recipient">
        {user?.result?.firstName + " " + user?.result?.lastName}
      </div>
      <div class="description">
        This certificate recognizes the completion of the course "
        {course?.title}" by {course?.instructor?.name}{" "}
        {new Date(Date.now()).toDateString()}.
      </div>

      <div class="date">{new Date(Date.now()).toDateString()}</div>
      <div class="signature">Signed by John Doe</div>
    </div>
  );
};
