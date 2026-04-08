<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Mail\EnrollApplicationNotification;
use App\Mail\GeneralEnquiryNotification;
use App\Mail\StudentFeedbackNotification;
use App\Mail\StudentItSupportNotification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class StudentFormsController extends Controller
{
    public function submitEnquiry(Request $request)
    {
        $validated = $request->validate([
            'first_name' => ['required', 'string', 'max:255'],
            'last_name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255'],
            'phone' => ['required', 'string', 'max:50'],
            'course_code' => ['required', 'string', 'max:255'],
            'message' => ['nullable', 'string', 'max:4000'],
        ]);

        Mail::to($this->notificationRecipient())->send(new GeneralEnquiryNotification($validated));

        return back()->with('success', 'Your enquiry has been submitted successfully. Our team will contact you shortly.');
    }

    public function submitSupport(Request $request)
    {
        $validated = $request->validate([
            'fullName' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255'],
            'phone' => ['nullable', 'string', 'max:50'],
            'studentId' => ['required', 'string', 'max:100'],
            'supportOption' => ['required', 'in:email,online-application,others'],
            'message' => ['required', 'string', 'max:4000'],
        ]);

        Mail::to($this->notificationRecipient())->send(new StudentItSupportNotification($validated));

        return back()->with('success', 'Your IT support request has been recorded.');
    }

    public function submitFeedback(Request $request)
    {
        $validated = $request->validate([
            'fullName' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255'],
            'phone' => ['nullable', 'string', 'max:50'],
            'subject' => ['required', 'string', 'max:255'],
            'message' => ['required', 'string', 'max:4000'],
        ]);

        Mail::to($this->notificationRecipient())->send(new StudentFeedbackNotification($validated));

        return back()->with('success', 'Thank you, your feedback has been received.');
    }

    public function submitEnroll(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255'],
            'phone' => ['required', 'string', 'max:50'],
            'subject_to_read' => ['required', 'string', 'max:255'],
            'career_goal_statement' => ['required', 'string', 'max:5000'],
            'previous_study' => ['required', 'string', 'max:255'],
            'document' => ['required', 'file', 'mimes:pdf,doc,docx,jpg,jpeg,png', 'max:10240'],
        ]);

        $document = $request->file('document');
        $storedPath = $document->store('enroll-documents', 'local');

        Mail::to($this->notificationRecipient())->send(
            new EnrollApplicationNotification(
                $validated,
                [
                    'path' => $storedPath,
                    'name' => $document->getClientOriginalName(),
                    'mime' => $document->getClientMimeType(),
                ]
            )
        );

        return back()->with('success', 'Enrollment request submitted successfully. Our admissions team will contact you soon.');
    }

    private function notificationRecipient(): string
    {
        return 'info@inventiontraining.com.au';
    }
}
