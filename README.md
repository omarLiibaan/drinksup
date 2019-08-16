# Drinksup Mobile App
<h4>First step, clone the project :</h4>

```
$ git clone https://github.com/omarLiibaan/drinksup.git

```

<i>to clone a specific branch :</i>

```
$ git clone -b name_of_the_branch https://github.com/omarLiibaan/drinksup.git
```

<h4>Second step, install all saved plugins :</h4>

```
$ npm install
```

<h4>Third step, build platforms :</h4>

```
$ ionic cordova build android
```

<i>or / and</i>

```
$ ionic cordova build ios
```

<h5>There's a chance that the app wont build on android and you might get this error :</h5>

```
* What went wrong:
Execution failed for task ':app:processDebugResources'.
```

<h5>In this case, you must add these lines :</h5>

```
<string name="fb_app_id">434430730652551</string>
<string name="fb_app_name">drinksup</string>
```

<h5><i>to platform > android > app > src > main > res > values >facebookconnect.html ( inside of "resources" tag )</i></h5>

