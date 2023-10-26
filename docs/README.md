## Scalability Considerations:

### How will your application work as the data set grows increasingly larger?

Given `GET /fund` endpoint is paginated will work effectively and consistent.
Thing is when there are 100 > Managers, FE should paginate Managers dropdown.
Payloads are small so that's not an issue.

### How will your application work as the # of concurrent users grows increasingly larger?

Application will work consistently since endpoints have only one well defined responsability and when Funds are being created an asynchronous process is triggered to finish applying business logic.

On the other hand, there are Scalability refactors that could be applied to this application:

From a Software Design perspective: 
  - Asynchronos processes could be moved into it's own Service and reduce current server instance processor.
  - Read endpoints could be in one service while Create/Update/Delete endpoints could be in another service instance and also using a Master/Slave database for read only and update tasks purposes, reducing work load on each DB.
  - An Event streamer like Kafka could be used to interact between services bringing alot of EDA patterns that provides scalability stratergies.
  - There are also Database approaches like Sharding that will help to apply scalability to Database Design.
  - Cache is another approach that helps managing high availiability.

From a Infrastructure perspective we've Vertical and Horizontal stratergies:
    - From vertical point of view will be increasing Instance resources so each instance can handle more work load.
    - From horizontal point of view will be having replicated services using load balancers
