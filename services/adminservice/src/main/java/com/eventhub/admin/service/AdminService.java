package com.EventZen.admin.service;

import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class AdminService {

    private final EntityManager em;

    public List<?> getUsers() {
        return em.createNativeQuery("SELECT * FROM users ORDER BY created_at DESC")
                .getResultList();
    }

    public List<?> getEvents() {
        return em.createNativeQuery("SELECT * FROM events ORDER BY created_at DESC")
                .getResultList();
    }

    public List<?> getRegistrations() {
        return em.createNativeQuery("SELECT * FROM registrations ORDER BY created_at DESC")
                .getResultList();
    }

    public List<?> getPayments() {
        return em.createNativeQuery("SELECT * FROM payments ORDER BY created_at DESC")
                .getResultList();
    }

    public Map<String, Object> getDashboard() {

        Object users = em.createNativeQuery("SELECT COUNT(*) FROM users").getSingleResult();
        Object events = em.createNativeQuery("SELECT COUNT(*) FROM events").getSingleResult();
        Object registrations = em.createNativeQuery("SELECT COUNT(*) FROM registrations").getSingleResult();
        Object revenue = em.createNativeQuery("SELECT IFNULL(SUM(amount),0) FROM payments WHERE status='SUCCESS'")
                .getSingleResult();

        return Map.of(
                "totalUsers", users,
                "totalEvents", events,
                "totalRegistrations", registrations,
                "totalRevenue", revenue);
    }

    public void cancelEvent(Long eventId) {
        em.createNativeQuery("UPDATE events SET status='CANCELLED' WHERE id=?")
                .setParameter(1, eventId)
                .executeUpdate();
    }

    public void rescheduleEvent(Long eventId, String newDate) {
        em.createNativeQuery("UPDATE events SET event_date=? WHERE id=?")
                .setParameter(1, newDate)
                .setParameter(2, eventId)
                .executeUpdate();
    }
}