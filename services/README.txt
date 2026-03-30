These are bootable Spring Boot service skeletons for Option 1 runtime.

Ports:
auth-service: 9001
user-service: 9002
catalog-service: 9003
event-service: 9004
registration-service: 9005
payment-service: 9006
notification-service: 9007
admin-service: 9008

Default DB config in every application.yml:
host=localhost
port=3306
database=EventZen_db
username=root
password=root

Change password/port in each application.yml if your MySQL differs.
