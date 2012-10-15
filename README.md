# UPnP Checker

## how to install

with Chrome canary, type
    chrome://extensions
in the address bar, check "Developer Mode" and click "load unpackaged ...". Then specify this apps directory.

With above step, you'll "UPnP Checker".

## how to use

click link
    _generated_background_page.html
then at the "Console" tab, typing
    upnp.search("ssdp:all");
you'll find UPnP device that responds to M-SEARCH.

parameter of upnp.search() indicating ST (it stands for Search Target). So, if you want to search specific target, please indicate it.
    ex. upnp.search("upnp:rootdevice");

