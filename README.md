## Is this service always going to be free to use? Will you keep it online? What's it hosted on?

It's free to use. Free Commercial usage may eventually* be rate limited at the lesser of 1terabyte or 10million connections per month, and a small fee or corporate sponsorship will remove that restriction. See further below.

It's eventually going to be load balanced just for fun, but for now it runs on a nearly empty VPS (1gb connection, 150gb NVME disk, 6GB ram, 6 CPU cores) so it should be fine along with costing me very little. I'll get notifications of downtime and will fix ASAP.


## Can I use it for commercial reasons:

Sure, knock yourself out. That's the main reason I stuck an API Key in, of DEMO for now, so that you can switch to a new key if and when your use becomes a problem. 

If you think you've got plans to be a problem, then email me (details on github profile) and I'll sort you out a key in advance. 

To make it clearer, if your commercial usage is part of a product or internal/external tool, and the company has revenue of more than 1million dollars per year then email me anyway, and maybe you can sponsor the approximately £40 (GBP) per year to server costs with you getting your name branded on the site with "hosting generously paid for by Your Company Name" and a link or whatever.


## What about getting an API Key, or monthly limits?

No limits, but if you end up in a crazy situation then you may get temporarily blocked. It's unlikely I'll notice to do that blocking though, so have at it (read point above). 

Eventually (check back if you ever have errors) I may setup a key system (can't be bothered for now), free still and DEMO will always work, but to avoid abuse affecting others there may be a rate limit on DEMO.

A wild finger in the air suggests in a distant future DEMO key gets limited at 100gb of transfer or 1million requests free per month per IP, after rate limited or register a key for 10x limit, donate for unlimited - but *I don't want the money/hassle so probably registered key = unlimited).


## Can I use the insecure http version at http://jq.gdenu.fi/ to fetch JSON on HTTPS (secure) sites, a bit like an insecure / https-busting proxy?

Yes, I liked the idea of potentially using it for lower memory usage on those pesky embedded microcontrollers.


## Got some docs?

Not really... Checkout a rambling story about why this came into fruitition here, which I'm also calling the documentation: https://adafruit-playground.com/u/tyeth/pages/jq-now-as-a-webservice-filtering-large-json-data
