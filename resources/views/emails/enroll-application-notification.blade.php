<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Enrollment Application Submission</title>
</head>
<body style="margin:0; padding:0; background:#f3f4f6; font-family:Arial, sans-serif; color:#111827;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f3f4f6; padding:24px 12px;">
        <tr>
            <td align="center">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:680px; background:#ffffff; border:1px solid #e5e7eb; border-radius:14px; overflow:hidden;">
                    <tr>
                        <td style="padding:20px 24px; background:linear-gradient(135deg,#7c2d12 0%,#b45309 100%);">
                            <p style="margin:0 0 6px 0; font-size:11px; letter-spacing:0.14em; text-transform:uppercase; color:#fde68a; font-weight:700;">
                                Admissions
                            </p>
                            <h1 style="margin:0; font-size:22px; line-height:1.25; color:#ffffff; font-weight:700;">
                                New Enrollment Application
                            </h1>
                        </td>
                    </tr>

                    <tr>
                        <td style="padding:20px 24px 10px 24px;">
                            <p style="margin:0; font-size:14px; line-height:1.6; color:#374151;">
                                A new enrollment form has been submitted. Candidate details are listed below.
                            </p>
                        </td>
                    </tr>

                    <tr>
                        <td style="padding:10px 24px 0 24px;">
                            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e5e7eb; border-radius:10px; overflow:hidden;">
                                <tr>
                                    <td style="width:240px; padding:10px 12px; font-size:13px; font-weight:700; color:#111827; background:#f9fafb; border-bottom:1px solid #e5e7eb;">Name</td>
                                    <td style="padding:10px 12px; font-size:13px; color:#1f2937; border-bottom:1px solid #e5e7eb;">{{ $payload['name'] }}</td>
                                </tr>
                                <tr>
                                    <td style="padding:10px 12px; font-size:13px; font-weight:700; color:#111827; background:#f9fafb; border-bottom:1px solid #e5e7eb;">Email</td>
                                    <td style="padding:10px 12px; font-size:13px; color:#1f2937; border-bottom:1px solid #e5e7eb;">{{ $payload['email'] }}</td>
                                </tr>
                                <tr>
                                    <td style="padding:10px 12px; font-size:13px; font-weight:700; color:#111827; background:#f9fafb; border-bottom:1px solid #e5e7eb;">Phone</td>
                                    <td style="padding:10px 12px; font-size:13px; color:#1f2937; border-bottom:1px solid #e5e7eb;">{{ $payload['phone'] }}</td>
                                </tr>
                                <tr>
                                    <td style="padding:10px 12px; font-size:13px; font-weight:700; color:#111827; background:#f9fafb; border-bottom:1px solid #e5e7eb;">Subject To Read</td>
                                    <td style="padding:10px 12px; font-size:13px; color:#1f2937; border-bottom:1px solid #e5e7eb;">{{ $payload['subject_to_read'] }}</td>
                                </tr>
                                <tr>
                                    <td style="padding:10px 12px; font-size:13px; font-weight:700; color:#111827; background:#f9fafb;">Previous Study (Last Read Class)</td>
                                    <td style="padding:10px 12px; font-size:13px; color:#1f2937;">{{ $payload['previous_study'] }}</td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <tr>
                        <td style="padding:16px 24px 0 24px;">
                            <p style="margin:0 0 8px 0; font-size:12px; letter-spacing:0.08em; text-transform:uppercase; color:#6b7280; font-weight:700;">
                                Career Goal Statement
                            </p>
                            <div style="border:1px solid #e5e7eb; border-radius:10px; background:#f9fafb; padding:12px; font-size:13px; line-height:1.7; color:#1f2937;">
                                {!! nl2br(e($payload['career_goal_statement'])) !!}
                            </div>
                        </td>
                    </tr>

                    <tr>
                        <td style="padding:16px 24px 0 24px;">
                            <p style="margin:0 0 8px 0; font-size:12px; letter-spacing:0.08em; text-transform:uppercase; color:#6b7280; font-weight:700;">
                                Attached Document
                            </p>
                            <div style="border:1px solid #e5e7eb; border-radius:10px; background:#f9fafb; padding:12px; font-size:13px; color:#1f2937;">
                                {{ $document['name'] }}
                            </div>
                        </td>
                    </tr>

                    <tr>
                        <td style="padding:18px 24px 22px 24px;">
                            <p style="margin:0; font-size:12px; color:#6b7280;">
                                Generated at {{ now()->format('d M Y, h:i A') }} - Document is attached to this email.
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
