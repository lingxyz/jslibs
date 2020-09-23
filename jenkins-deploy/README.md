# jenkins-deploy
Npm package for local deploy in Jenkins

## Startup

```bash
npm i -D jenkins-deploy
```

```json
{
  "scripts": {
    "deploy": "jd [url] [token/username/password] [env] [project name] [branchname]"
}
```

or `jdConfig.yaml`

```bash
- url: [url]
- token: [token]
- username: [username]
- password: [password]
- env: [env]
- name: [project name]
- branch: [branch name]
```

```json
{
  "scripts": {
    "deploy": "jd"
}
```

## Features
- [ ] fast deploy at local project
- [ ] show real time process
