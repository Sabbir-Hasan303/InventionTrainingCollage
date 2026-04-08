<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Attachment;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class EnrollApplicationNotification extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(
        public array $payload,
        public array $document
    ) {
    }

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'New Enrollment Application Submission',
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.enroll-application-notification',
        );
    }

    public function attachments(): array
    {
        return [
            Attachment::fromStorageDisk('local', $this->document['path'])
                ->as($this->document['name'])
                ->withMime($this->document['mime'] ?? 'application/octet-stream'),
        ];
    }
}

