---
layout: default
---

# Client Hints 

I had a problem. 
At work, we have a Next.js application serving articles. 

When I implemented dark mode I noticed a side effect: flickering at every start of the page. 

I found out it happens because when the server generates the HTML, dark mode client preference is not available. 

In order to solve this problem, I needed to find a way notify the server about the client metadata at the very beginning: Client Hints.

### So what are HTTP Client Hints?
A way for the server to ask and get info about the client [(device, dark-mode preference, approximate bandwidth, reduced data preference...)](https://browserleaks.com/client-hints)

### Why were Client Hints invented?
A replacement for the User-agent string.
Google and Mozilla want to [freeze and unify it](https://groups.google.com/a/chromium.org/g/blink-dev/c/-2JIRNMWJ7s/m/yHe4tQNLCgAJ)

### Who's their creator: 
Google. 

### Motivation: 
1. Privacy - Now the client can negotiate with the server on what to send. 
2. Efficiency - It is easier to extract and maintain it than user-agent string (For historical reasons user-agent contains a lot of irrelevant information).
3. Political -  Up until now user-agent was used to fingerprint users.  Google aims to make fingerprinting harder for other parties.

### Client Hints need to be reliable
1. The server and client hint preferences may be out of sync
2. The browser does not wish to send the requested client hint. 

### How it works: 
1. Server (origin), sends those response headers:  
    __Accept-CH__ = I (server) support those hints.   
    __Critical-CH__ = I (server) need those hints, pls give them to me if you haven't already.
2. Server gets those headers from the client on each next request (if allowed). 

### Is there another way for the client to send Client Hints?
Yes, you can specify them in html <meta> element with the http-equiv attribute:
example: `<meta http-equiv="Accept-CH" content="Downlink, sec-ch-prefers-color-scheme">`

### So, How many network calls I'll make? 
 - 1 -> If you use HTTP/2 + TLS 1.3 + ALPS: Client Hints would be available in the first request.
 - 2 -> If running older software. Can continue to use Critical-CH. The round trip will be at the first load. 
 
 * Critical-CH costs a round-trip, so making ACCEPT_CH + ALPS always work would seem preferable


### Caching:
To cache the response of different Client Hints, also add them to the [Vary response header](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Vary).

### Demo:
![Client Hints Demo](https://res.cloudinary.com/purplecmd/image/upload/v1655847359/blog/client-hints_nvikb4.png)


### So, is it only a Chrome thing? 
No:  
- Firefox - [They have started discussing adding support for it.](https://bugzilla.mozilla.org/show_bug.cgi?id=935216)  
- Safari - unknown yet. 


##### _sources:_
- https://github.com/WICG/client-hints-infrastructure/blob/main/reliability.md  
- https://chromium.googlesource.com/chromium/src/+/refs/  
heads/main/components/client_hints/README.md   
- https://mpulp.mobi/2020/01/16/client-hints-replacing-the-user-agent/  
- https://developer.mozilla.org/en-US/docs/Web/HTTP/Client_hints  
