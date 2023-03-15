import { inject, Injectable, NgZone } from '@angular/core';
import {
    Auth, signOut, user, signInWithEmailAndPassword, createUserWithEmailAndPassword,
    updateProfile, sendEmailVerification, sendPasswordResetEmail, User, authState, onAuthStateChanged,
    ActionCodeSettings
} from '@angular/fire/auth';
import { Router } from '@angular/router';
import { onIdTokenChanged } from 'firebase/auth';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private _route = '';
    private auth: Auth = inject(Auth);
    private router: Router = inject(Router);
    private ngZone: NgZone = inject (NgZone);

    constructor() {
        this.onAuthStateChanged();
    }

    setActiveRoute(url: string) {
        this._route = url;
    }

    public get authState() {
        return authState(this.auth);
    }

    public get user() {
        return user(this.auth);
    }

    onIdTokenChanged() {
        onIdTokenChanged(this.auth, async usr => {
            const tokenResult = await usr?.getIdTokenResult();
            console.log('IdToken', tokenResult?.authTime);
        })
    }

    private onAuthStateChanged() {
        onAuthStateChanged(this.auth, usr => {
            if (usr) {
                this.ngZone.run(() => {
                    this.router.navigate([this._route]).catch(reason => console.log(reason));
                });
            } else {
                this.ngZone.run(() => {
                    this.router.navigate(['login']).catch(reason => console.log(reason));
                });
            }
        });
    }

    signInWithEmailAndPassword(email: string, password: string) {
        return signInWithEmailAndPassword(this.auth, email, password);
    }

    createUserWithEmailAndPassword(email: string, password: string) {
        return createUserWithEmailAndPassword(this.auth, email, password);
    }

    updateProfile(data: any) {
        return updateProfile(this.auth.currentUser as User, data);
    }

    sendEmailVerification(actionCodeSettings?: ActionCodeSettings) {
        return sendEmailVerification(this.auth.currentUser as User, actionCodeSettings);
    }

    sendPasswordResetEmail(email: string, actionCodeSettings?: ActionCodeSettings) {
        return sendPasswordResetEmail(this.auth, email, actionCodeSettings);
    }

    signOut() {
        signOut(this.auth);
    }
}