## How to use
Step 1:
Clone into the directory you want it to be kept in

``` 
git clone https://github.com/SWE30010-Development-Project-2/backend.git
```

Step 2:
Install MongoDB

[Link](https://www.mongodb.com/download-center/community)

Step 3:
```
npm install
npm run dev
```

## Its not working!!
Maybe port 9000 is in use.
In powershell, type 
```
netstat -ano | findstr :9000
```
Then kill the process
```
taskkill /PID {{Process ID}} /F
```


More info

[Link](https://stackoverflow.com/questions/39632667/how-to-kill-the-process-currently-using-a-port-on-localhost-in-windows)

Or ask Jordan