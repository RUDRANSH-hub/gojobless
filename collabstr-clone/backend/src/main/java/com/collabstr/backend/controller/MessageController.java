package com.collabstr.backend.controller;

import com.collabstr.backend.dto.MessageDto;
import com.collabstr.backend.entity.Message;
import com.collabstr.backend.entity.User;
import com.collabstr.backend.repository.MessageRepository;
import com.collabstr.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
public class MessageController {

    private final SimpMessagingTemplate messagingTemplate;
    private final MessageRepository messageRepository;
    private final UserRepository userRepository;

    @MessageMapping("/chat")
    public void processMessage(@Payload MessageDto messageDto) {
        User sender = userRepository.findById(messageDto.getSenderId()).orElseThrow();
        User receiver = userRepository.findById(messageDto.getReceiverId()).orElseThrow();

        Message savedMsg = messageRepository.save(Message.builder()
                .sender(sender)
                .receiver(receiver)
                .content(messageDto.getContent())
                .build());

        MessageDto responseDto = MessageDto.builder()
                .id(savedMsg.getId())
                .senderId(sender.getId())
                .receiverId(receiver.getId())
                .content(savedMsg.getContent())
                .timestamp(savedMsg.getTimestamp())
                .build();

        messagingTemplate.convertAndSendToUser(
                messageDto.getReceiverId().toString(), "/queue/messages", responseDto
        );
    }

    @GetMapping("/api/messages/{userId}")
    public ResponseEntity<List<MessageDto>> getChatHistory(@PathVariable UUID userId) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        User currentUser = userRepository.findByEmail(auth.getName()).orElseThrow();

        List<Message> messages = messageRepository.findChatHistory(currentUser.getId(), userId);

        List<MessageDto> response = messages.stream().map(m -> MessageDto.builder()
                .id(m.getId())
                .senderId(m.getSender().getId())
                .receiverId(m.getReceiver().getId())
                .content(m.getContent())
                .timestamp(m.getTimestamp())
                .build()
        ).collect(Collectors.toList());

        return ResponseEntity.ok(response);
    }
}
