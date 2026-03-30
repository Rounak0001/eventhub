package com.EventZen.notification.service;

import com.EventZen.notification.enums.EmailType;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class EmailTemplateService {

    public String buildSubject(EmailType type, Map<String, String> data) {
        return switch (type) {
            case REGISTRATION_CONFIRMED -> "Registration Confirmed - EventZen";
            case PAYMENT_SUCCESS -> "Payment Successful - EventZen";
            case EVENT_CANCELLED -> "Event Cancelled - EventZen";
            case EVENT_RESCHEDULED -> "Event Rescheduled - EventZen";
        };
    }

    public String buildBody(EmailType type, Map<String, String> data) {
        return switch (type) {
            case REGISTRATION_CONFIRMED -> registrationConfirmed(data);
            case PAYMENT_SUCCESS -> paymentSuccess(data);
            case EVENT_CANCELLED -> eventCancelled(data);
            case EVENT_RESCHEDULED -> eventRescheduled(data);
        };
    }

    private String registrationConfirmed(Map<String, String> data) {
        String attendeeName = value(data, "attendeeName");
        String eventName = value(data, "eventName");
        String eventDate = value(data, "eventDate");
        String venueName = value(data, "venueName");

        return """
                <div style="font-family:Arial,sans-serif;line-height:1.6;color:#111;">
                  <h2>Registration Confirmed</h2>
                  <p>Hi %s,</p>
                  <p>Your registration for <b>%s</b> has been confirmed.</p>
                  <p><b>Date:</b> %s</p>
                  <p><b>Venue:</b> %s</p>
                  <p>Thanks for choosing EventZen.</p>
                </div>
                """.formatted(attendeeName, eventName, eventDate, venueName);
    }

    private String paymentSuccess(Map<String, String> data) {
        String attendeeName = value(data, "attendeeName");
        String eventName = value(data, "eventName");
        String amount = value(data, "amount");
        String paymentId = value(data, "paymentId");

        return """
                <div style="font-family:Arial,sans-serif;line-height:1.6;color:#111;">
                  <h2>Payment Successful</h2>
                  <p>Hi %s,</p>
                  <p>Your payment for <b>%s</b> was successful.</p>
                  <p><b>Amount:</b> ₹%s</p>
                  <p><b>Payment ID:</b> %s</p>
                  <p>We look forward to seeing you at the event.</p>
                </div>
                """.formatted(attendeeName, eventName, amount, paymentId);
    }

    private String eventCancelled(Map<String, String> data) {
        String attendeeName = value(data, "attendeeName");
        String eventName = value(data, "eventName");

        return """
                <div style="font-family:Arial,sans-serif;line-height:1.6;color:#111;">
                  <h2>Event Cancelled</h2>
                  <p>Hi %s,</p>
                  <p>We regret to inform you that <b>%s</b> has been cancelled.</p>
                  <p>Any applicable refund details will be shared separately.</p>
                </div>
                """.formatted(attendeeName, eventName);
    }

    private String eventRescheduled(Map<String, String> data) {
        String attendeeName = value(data, "attendeeName");
        String eventName = value(data, "eventName");
        String newDate = value(data, "newDate");
        String newTime = value(data, "newTime");

        return """
                <div style="font-family:Arial,sans-serif;line-height:1.6;color:#111;">
                  <h2>Event Rescheduled</h2>
                  <p>Hi %s,</p>
                  <p>Your event <b>%s</b> has been rescheduled.</p>
                  <p><b>New Date:</b> %s</p>
                  <p><b>New Time:</b> %s</p>
                </div>
                """.formatted(attendeeName, eventName, newDate, newTime);
    }

    private String value(Map<String, String> data, String key) {
        if (data == null)
            return "";
        return data.getOrDefault(key, "");
    }
}