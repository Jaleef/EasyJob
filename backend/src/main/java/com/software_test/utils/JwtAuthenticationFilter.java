package com.software_test.utils;

import com.software_test.utils.JwtUtil;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;  
import java.util.Collections;

public class JwtAuthenticationFilter extends OncePerRequestFilter {
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        String token = request.getHeader("Authorization");
        if (StringUtils.hasText(token) && JwtUtil.validateToken(token) && SecurityContextHolder.getContext().getAuthentication() == null) {
            // 检查exp
            if (JwtUtil.isTokenExpired(token)) {
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                response.getWriter().write("Token已过期");
                return;
            }
            // 这里可以从token中解析出account等
            String account = JwtUtil.getAccountFromToken(token);
            // 构造认证对象（这里只做简单示例，实际可查数据库获取用户权限等）
            UsernamePasswordAuthenticationToken authentication =
                    new UsernamePasswordAuthenticationToken(account, null, Collections.emptyList());
            authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
            // 注入到Spring Security上下文
            SecurityContextHolder.getContext().setAuthentication(authentication);
        }
        filterChain.doFilter(request, response);
    }
}
