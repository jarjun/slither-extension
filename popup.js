// Copyright (c) 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

chrome.browserAction.onClicked.addListener(function (tab) {
  
  chrome.tabs.executeScript(null, {file: "content_script.js"}, function(){
   alert("done");
  });
  // console.log("here");
  // chrome.tabs.sendMessage(tab.id, {text: 'report_back'}, function(pls){
  //   alert(pls.farewell);
  // });
});
