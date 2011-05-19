function runTest()
{
    FBTest.sysout("cookies.test.editCookies; START");

    FBTestFirebug.openNewTab(basePath + "general/editCookies.php", function(win)
    {
        FBTestFireCookie.enableCookiePanel(function(win)
        {
            var panelNode = FBTestFirebug.selectPanel("cookies").panelNode;
            var cookie = FBTestFireCookie.getCookieByName(panelNode, "EditCookie3");

            editCookie(cookie);

            FBTest.compare(".janodvarko.cz", cookie.cookie.host, "Check new cookie host");
            FBTestFirebug.testDone("cookies.test.editCookies; DONE");
        });
    });
};

function editCookie(cookie)
{
    FBTest.ok(cookie, "Cookie must exist.");
    if (!cookie)
        return;

    var uri = FW.FBL.makeURI(basePath);
    var host = uri.host;

    FBTest.compare(host, cookie.cookie.host, "Check cookie host.");

    // Open editCookie.xul dialog and edit the value.
    FBTest.sysout("cookies.test.issue34; let's edit an existing cookie");
    return FBTestFireCookie.editCookie(cookie, function(dialog) {
        dialog.EditCookie.domainNode.value = ".janodvarko.cz";
        dialog.EditCookie.onOK();
    });
}
