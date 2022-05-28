---
layout: default
---

# Client Hints 

I had a problem. 
At work, we have a Next.js application serving articles. 
When I implemented dark mode I noticed a flickering at every start of the page. 
I found out happens because when the server generates the HTML, dark mode client preference is not available. 
So I tried to find a solution to notify the server about the client preferences at the first request and I found my savior: Client Hints.

### So what are HTTP Client Hints?
A way for the server to ask and get info about the client (device, dark-mode preference, approximate bandwidth, reduced data preference...)
* This cache is cleared when session cookies are cleared, or when a user clears site data or cookies for a given origin.
* Client Hints are not available on the very first navigation request 

### Why were Client Hints invented?
User-agent string.
Google and Mozilla want to [freeze and unify it](https://groups.google.com/a/chromium.org/g/blink-dev/c/-2JIRNMWJ7s/m/yHe4tQNLCgAJ)

### Who's their creator: 
Google. 

### Motivation: 
1. Privacy - Now the client can negotiate with the server on what to send. 
2. Efficiency - For historical reasons user-agent contains a lot of irrelevant information.
3. Political -  Up until now user-agent was used to fingerprint users.  Google aims to make fingerprinting harder for other parties.

### Client Hints need to be reliable
1. The server and client hint preferences may be out of sync
2. The browser does not wish to send the requested client hint. 

### How it works: 
1. Server (origin), sends those response headers:
    Accept-CH = I (server) support those hints. 
    Critical-CH = I (server) need those hints, pls give them to me if you haven't already.
2. Server gets those headers from the client on each next request (if allowed). 

### Is there another way for the client to send Client Hints?
Yes, you can specify them in html <meta> element with the http-equiv attribute:
example: `<meta http-equiv="Accept-CH" content="Downlink, sec-ch-prefers-color-scheme">`

### So, How many network calls I'll make? 
 - 1 -> If you use HTTP/2 + TLS 1.3 + ALPS: Client Hints would be available in the first request.
 - 2 -> If Sites running older software. Can continue to use Critical-CH. The round trip will be at the first load. 
 
 * Critical-CH costs a round-trip, so making ACCEPT_CH + ALPS always work would seem preferable



### Caching:
To cache the response of different Client Hints, also add them to the [Vary response header](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Vary).

### So, is it only a Chrome thing? 
Firefox - [They have started discussing adding support for it.](https://bugzilla.mozilla.org/show_bug.cgi?id=935216)  
Safari - don't know yet. 



##### _sources:_
- https://github.com/WICG/client-hints-infrastructure/blob/main/reliability.md  
- https://chromium.googlesource.com/chromium/src/+/refs/  
heads/main/components/client_hints/README.md   
- https://mpulp.mobi/2020/01/16/client-hints-replacing-the-user-agent/  
- https://developer.mozilla.org/en-US/docs/Web/HTTP/Client_hints  
