<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class GeneralEnquiryNotification extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(public array $payload)
    {
    }

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'New Website Enquiry Submission',
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.general-enquiry-notification',
        );
    }

    public function attachments(): array
    {
        return [];
    }
}

