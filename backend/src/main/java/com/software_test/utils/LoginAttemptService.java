package com.software_test.utils;

import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentLinkedQueue;

public class LoginAttemptService {
    private final int MAX_ATTEMPT = 5;
    private final long TIME_WINDOW = 5 * 60 * 1000; // 5分钟，单位毫秒

    private ConcurrentHashMap<String, ConcurrentLinkedQueue<Long>> attempts = new ConcurrentHashMap<>();

    public boolean isBlocked(String ip) {
        long now = System.currentTimeMillis();
        attempts.putIfAbsent(ip, new ConcurrentLinkedQueue<>());
        ConcurrentLinkedQueue<Long> times = attempts.get(ip);

        // 移除过期的记录
        while (!times.isEmpty() && now - times.peek() > TIME_WINDOW) {
            times.poll();
        }
        return times.size() >= MAX_ATTEMPT;
    }

    public void loginFailed(String ip) {
        long now = System.currentTimeMillis();
        attempts.putIfAbsent(ip, new ConcurrentLinkedQueue<>());
        attempts.get(ip).add(now);
    }

    // 获取指定IP的当前登录尝试次数
    public int getAttemptCount(String ip) {
        long now = System.currentTimeMillis();
        attempts.putIfAbsent(ip, new ConcurrentLinkedQueue<>());
        ConcurrentLinkedQueue<Long> times = attempts.get(ip);

        // 移除过期的记录
        while (!times.isEmpty() && now - times.peek() > TIME_WINDOW) {
            times.poll();
        }
        return times.size();
    }
}