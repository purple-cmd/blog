---
layout: default
---

# Client Hints 

I had a problem. 
At work we have a Next.js application serving articles. 
When I implemented dark-mode I've noticed a flickering at every start of the page. 
This happens because when the server was making the html webpage, it didn't know if the user-preference for dark mode. 

So I tried to find a solution, to notify the server about the client preferences at the first request and I found my savior: Client Hints: 

### So what are Http Client Hints? 
A way for the server to ask and get info about the client (device, dark-mode preference, approximate bandwidth, reduced data preference...)
* This cache is cleared when session cookies are cleared, or when a user clears site data or cookies for a given origin.
* Client Hints are not available on the very first navigation request 

### What they intend to replace?
User-agent string.
Google and Mozilla wants to [freeze and unify it](https://groups.google.com/a/chromium.org/g/blink-dev/c/-2JIRNMWJ7s/m/yHe4tQNLCgAJ)

Who's the creator: Google. 

### Motivation: 
1. Privacy - Now client can negotiate with server on what to send from privacy endpoint. 
2. Efficiency - For historical reasons user-agent contains a lot of largely irrelevant information.
3. Political -  Up until now user-agent was used in order to fingerprint users, and google wants to make fingerprinting harder.

### Client Hints need to be reliable
1. The server and client client hint preferences may be out of sync
2. The browser does not wish to send the requested client hint. 

### How it works: 
1. Server (origin), sends those response headers:
	Accept-CH = I (server) support those hints. 
	Critical-CH = I (server) need those hints, pls give them to me if you haven't already.
2. Server get those headers from client on each next request (if allowed). 

### Is there another way for client to send client hints?
Yes, you can specify them in html <meta> element with the http-equiv attribute:
example: `<meta http-equiv="Accept-CH" content="Width, Downlink, Sec-CH-UA">`

### So, How many network calls I'll make? 
 - 1 -> If you use HTTP/2 + tls 1.3 + ALPS: Client Hints would be available in the first request.
 - 2 -> If Sites running older software. Can continue to use Critical-CH. The round trip will be at first page load. 
 
 * Critical-CH costs a round-trip, so making ACCEPT_CH + ALPS always work would seem preferable


### Caching:
In order to cache the response of different client-hints we should add all of them also to the [Vary response header](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Vary).

### So, is it only a Chrome thing? 
Firefox - [They have started discussing adding support for it.](https://bugzilla.mozilla.org/show_bug.cgi?id=935216)  
Safari - don't know yet. 


##### _sources:_
<span class="small">
https://github.com/WICG/client-hints-infrastructure/blob/main/reliability.md
https://chromium.googlesource.com/chromium/src/+/refs/heads/main/components/client_hints/README.md
https://mpulp.mobi/2020/01/16/client-hints-replacing-the-user-agent/
https://developer.mozilla.org/en-US/docs/Web/HTTP/Client_hints
</span>

