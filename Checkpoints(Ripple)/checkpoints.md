## 1

- .env file is used to make environment variables (it basically helps us to hide some keys or infos that we do not wish to share with the public like API Keys, Passwords etc.)

- .env file is accessed as well as environment variable in them is defined differently in case we have made our project using Create React APP or through Vite or Next.js etc

- .env file is made in sync with the main-root level (same level at which package.json, package-lock.json etc are made)

- in case of CRA 
--  variable declaration
    REACT_APP_NOT_SECRET_CODE 
    (NOT_SECRET_CODE is the name of our variable)
-- variable access
    process.env.REACT_APP_NOT_SECRET_CODE

- in case of Vite 

To prevent accidentally leaking env variables to the client, only variables prefixed with VITE_ are exposed to your Vite-processed code. e.g. for the following env variables:

        VITE_SOME_KEY=123
        DB_PASSWORD=foobar

Only VITE_SOME_KEY will be exposed as import.meta.env.VITE_SOME_KEY to your client source code, but DB_PASSWORD will not.

            console.log(import.meta.env.VITE_SOME_KEY) // "123"
            console.log(import.meta.env.DB_PASSWORD) // undefined

## 2
- Was facing some issue in adding .env files to .gitignore (one way to add during commit phase)
- discovered another way and that is make env file not as '.env' but as '.env.local' as '.local' file gets automatically gitignored
