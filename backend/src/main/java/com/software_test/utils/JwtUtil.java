package com.software_test.utils;

import io.jsonwebtoken.*;
import java.util.Date;

public class JwtUtil {
    private static final String SECRET_KEY = "nwpu123"; 

    // 生成token
    public static String generateToken(String account) {
        long nowMillis = System.currentTimeMillis();
        long expMillis = nowMillis + 86400000; // 1天
        Date now = new Date(nowMillis);
        Date exp = new Date(expMillis);

        return Jwts.builder()
                .claim("account", account)
                .setIssuedAt(now)
                .setExpiration(exp)
                .signWith(SignatureAlgorithm.HS256, SECRET_KEY)
                .compact();
    }

    // 解析token
    public static String getAccountFromToken(String token) {
        Claims claims = Jwts.parser()
                .setSigningKey(SECRET_KEY)
                .parseClaimsJws(token)
                .getBody();
        return claims.get("account", String.class); // 或 getSubject()，看你token怎么生成的
    }

    // 校验token
    public static boolean validateToken(String token) {
        try {
            Jwts.parser().setSigningKey(SECRET_KEY).parseClaimsJws(token);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    public static boolean isTokenExpired(String token) {
        Claims claims = Jwts.parser()
                .setSigningKey(SECRET_KEY)
                .parseClaimsJws(token)
                .getBody();
        Date expiration = claims.getExpiration();
        return expiration.before(new Date());
    }
}
