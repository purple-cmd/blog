---
layout: default
---
## React Hooks Pitfalls

I'm ok with react hooks as a notion, I like the minimalistic and functional approach they give me, allowing me to write cleaner and more readable code, but hooks comes at a price:

1. __Extremely unopinionated__ - React is unopinionated, and particularly hooks. React team haven't given us clear examples and patterns regarding how to write custom hooks, they said: "useYourImagination()".  
 To me, the hardest part embracing hooks was writing the custom ones. It took me long time to think of a pattern that would really work for me, and so far I don't have strict guidelines.   

2. __useEffect ambigiousity__ -
    - At the beginning, you may think useEffect works like a "useWatch" function, but it doesn't. You think in cause and effect, but! for react to catch the most updated value of variables there, we have to add each and one of them to the dependency array, thus creating a long array of refreshers we didn't intended to, and decreasing readability.   
    - At the beginning, you may think useEffect is the combination of componentDidMount, componentDidUpdate and componentWillUnmount. Only to discover that it really isn't, and that you have to change your ways of thinking.   
    - This hook is an anonymous function, without a name, further making it harder for you to understand.         


3. __Memo? you decide__ - React hooks leaves the programer to think about where to put memoization in code, while classes didn't (aside from memo), while other frontend frameworks like Angular, Svelte and Vue don't ask us to care about those things.  
I cope with that by checking performance with react dev extension from time to time and just then deciding where to memo. 
But, this is a bad pattern, I've already seen many programmers putting useMemo/useCallback/memo everywhere in the code, which just makes the code less readable and creates another scope for each variable, this, in wrong use cases, may decrease performance.  

In the last react conf, [one of react team members related to this issue](https://www.youtube.com/watch?v=lGEMwh32soc).

---

## So how can we try solve those problems? 
1. __Extremely unopinionated__ - Give some pattern to how custom hooks should look, maybe the news react docs (currently in beta) will do us this favor.  

2. __useEffect ambigiousity__ -  
    - Change the react rules so useEffect will be "useWatch", that we would not need to put each and every variable there.  
    - More practical: Wrap useEffect with simpler hook, although I'm against this one, why complex things from the beginning?  
    - More practical: A complier like "react-forget", which will add those dependencies before compilation. At current stage, it may introduce bugs.  

3. __Memo? you decide__ - "react forget" or thinking of a newer model for react-hooks which doesn't make us work so hard. It's up for the react team to decide.  


