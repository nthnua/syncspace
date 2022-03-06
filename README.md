# syncspace

Abstract:
---

An API (rest/graphql/event based) to create **spaces** such that, multiple clients can join the *space* and data will be shared across the *space*.
___

Initial soft specifications:
---

- This could be event driven to make it possible to have instant updates across the *space*.
- The space is created on demand. ie. when user explicitely requests the api to create a *space* for it.
- This space would be a document in mongodb for now.
- File syncing using storage buckets would be the next step.
- *Space* will be identified by a unique id, prefarably a long-random-string which will be used to *connect* to the *space*.
- Creating aswell as connecting to the *space* should be as convinient as possible, for eg. a POST request with the initial data to create a *space*. scanning a url in the form of a qr code to connect to the *space*.
- Anyone with the link will be able to access the data/connect to the *space*, hence it should be carried out using the aforementioned long-random-string.
- Client specifies the 'schema' for the document to be stored / schema-less, hence can be used as a sync module in different projects.


