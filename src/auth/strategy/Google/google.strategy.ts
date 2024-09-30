import { PassportStrategy } from "@nestjs/passport";
import { Profile, Strategy } from 'passport-google-oauth20';
import { Injectable } from "@nestjs/common";
import { ObjectId } from 'mongodb';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super(
            {
                clientID: process.env.CLIENT_AUTH_GOOGLE_ID,
                clientSecret: process.env.CLIENT_AUTH_GOOGLE_SECRET,
                callbackURL: 'https://tinamys.com:3000/auth/google/redirect',
                scope: ['profile', 'email'],
            }
        );
    }

    async validate(accessToken: string, refreshToken: string, profile: Profile) {
        console.log('check accessToken', accessToken);
        console.log('check refreshToken', refreshToken);
        console.log('check profile', profile);

        const user = {
            _id: new ObjectId(`${profile.id}${'afc'}`),
            fullname: `${profile?.name?.familyName} ${profile?.name?.givenName}`,
            image: profile?._json.picture,
            email: profile?._json.email,
            provider: profile?.provider,
            role: 'user'
        }

        return user || null;
    }
}