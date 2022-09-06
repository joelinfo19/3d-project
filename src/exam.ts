(() => {
    type Gender = 'MASCULINO'|'FEMENINO';
    interface PersonProps{
        birthdate:Date;
        genero:Gender;
        nombre:string;
    }
    class Person {
        public birthdate:Date;
        public genero:Gender;
        public nombre:string;
    
        constructor ({nombre,genero,birthdate}:PersonProps){
            this.nombre=nombre;
            this.genero=genero;
            this.birthdate=birthdate;
        }
    }
    interface UserProps{
        email:string;
        role:string;
        nombre:string;
        genero:Gender;
        birthdate:Date;
    }
    class User extends Person {
        public lastAccess: Date;
        public role:string;
        public email:string;
        constructor({email,role,nombre,genero,birthdate}:UserProps){
            super({nombre, genero, birthdate} ); 
            this.lastAccess = new Date();
            this.email=email;
            this.role=role;
        }
        checkCredentials(){
        return true;
        }
    }
    interface UserSettingsProps{
        workingDirectory: string, 
        lastOpenFolder : string, 
        email : string,
        role : string, 
        nombre : string, 
        genero : Gender, 
        birthdate : Date
    }
    class UserSettings extends User {
        public workingDirectory:string;
        public lastOpenFolder:string
        constructor(
           { workingDirectory,
            lastOpenFolder,
            email,
            role,
            nombre,
            genero,
            birthdate,}:UserSettingsProps
        ) {
            super({email, role, nombre, genero, birthdate} );
            this.workingDirectory=workingDirectory;
            this.lastOpenFolder=lastOpenFolder
            }
    }
    const usersettings = new UserSettings( {
        workingDirectory:'/usr/home ',
        lastOpenFolder:'/home', 
        email:'luis@ggmail.com', 
        role:'Admin' ,
        nombre:'Luis' ,
        genero:'MASCULINO',
        birthdate:new Date('1992-8-8')}
    );
    console.log({usersettings });
}) () ;