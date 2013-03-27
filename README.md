#thesuperintendent

node implementation of the AuntieDot Halo 4 API

This repo is for developers who want to set up their own superintendent server. The superintendent currently only fetches commendation data from the game Halo 4.

###Fast Setup

    git clone git://github.com/abedley/thesuperintendent.git
    cd server
    node index.js
  
Navigate to

    http://localhost:1337/?user=<your gamertag email>&pass=<your email password>&serverpass=<the password defined in librarian.js>
