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

Just in case the app wont build on android platform, try adding:
```
<string name="fb_app_id">434430730652551</string>
<string name="fb_app_name">drinksup</string>
```
to platform > android > app > src > main > res > values >facebookconnect.html
<br />
inside of "resources" tag
