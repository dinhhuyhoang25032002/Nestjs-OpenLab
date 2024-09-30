import { JwtService } from '@nestjs/jwt';
type token = {
    access_token: string,
    refresh_token: string
};

const jwtService = new JwtService();

export const getToken = async (userId: string, email: string): Promise<token> => {
    const [accessToken, refreshToken] = await Promise.all([
        jwtService.signAsync(
            {
                sub: userId,
                email: email,
            },
            {
                secret: process.env.SECRET_KEY,
                expiresIn: 60*2
            }
        ),
        jwtService.signAsync(
            {
                sub: userId,
                email: email,
            },
            {
                secret: process.env.SECRET_KEY,
                expiresIn: 60 * 60 * 24 * 7
            }
        )
    ]);
    return {
        access_token: accessToken,
        refresh_token: refreshToken
    }
}