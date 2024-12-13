/*
https://webextension-api.thunderbird.net/en/128-esr-mv3/compose.html

https://webextension-api.thunderbird.net/en/128-esr-mv3/composeAction.html

https://thunderbird.topicbox.com/groups/addons/T0bdc0bdd9ce1923a

https://blog.apar.jp/program/17846/
*/

messenger.composeAction.onClicked.addListener(async (tab) => {
  const cb = await navigator.clipboard.readText();
  const details = await messenger.compose.getComposeDetails(tab.id);
  if (0 < details.subject.length) {
    messenger.compose.setComposeDetails(tab.id, {
      plainTextBody: cb + "\n" + details.plainTextBody,
    });
    return;
  }
  const lines = cb.split("\n");
  if (lines.length < 2) {
    return;
  }
  const s = lines[0];
  const b = lines.slice(1).join("\n");
  messenger.compose.setComposeDetails(tab.id, {
    plainTextBody: b + "\n" + details.plainTextBody,
    subject: s,
  });
});
