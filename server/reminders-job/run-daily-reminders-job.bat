echo 'executing send-daily-reminders.js'

REM update this CD to point to the path of the send-daily-reminders.js
cd C:\...\birthday-tracker\server\reminders-job

node send-daily-reminders.js

pause

exit