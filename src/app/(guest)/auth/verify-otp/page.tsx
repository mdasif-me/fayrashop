"use client";

import React, { useState, useEffect } from "react";
import CreativeOTPInput from "@/components/ui/creative-otp-input";
import { motion, AnimatePresence } from "framer-motion";
import { useSearchParams, useRouter } from "next/navigation";
import { fetchClient } from "@/lib/api-config";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/providers/auth-provider";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";

export default function VerifyOTPPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { toast } = useToast();
  const { refreshProfile } = useAuth();

  const email = searchParams.get("email") || "";
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);

  useEffect(() => {
    if (!email) {
      toast({
        title: "Error",
        description: "Email address not found. Please try registering again.",
        variant: "destructive",
      });
      router.push("/auth");
    }
  }, [email, router, toast]);

  const handleComplete = async (otp: string) => {
    if (!email) return;

    setIsVerifying(true);
    setStatus("idle");

    console.log('🔐 Verifying OTP:', { email, otp });

    try {
      const response = await fetchClient("/v1/users/verify-otp", {
        method: "POST",
        body: JSON.stringify({ email, otp }),
      });

      console.log('✅ OTP Verification Response:', response);

      setStatus("success");

      toast({
        title: "Success!",
        description: "Your email has been verified successfully.",
      });

      // Refresh profile to update verification status
      try {
        await refreshProfile();
        console.log('✅ Profile refreshed after OTP verification');
      } catch (profileError) {
        console.warn('⚠️ Profile refresh failed (non-critical):', profileError);
      }

      // Clear pending email from localStorage
      localStorage.removeItem("pending_verification_email");

      // Redirect to login or home after 2 seconds
      setTimeout(() => {
        router.push("/auth");
      }, 2000);
    } catch (error: any) {
      console.error('❌ OTP Verification Error:', error);
      console.error('Error details:', {
        message: error.message,
        status: error.status,
        response: error.response
      });

      setStatus("error");

      // More specific error messages
      let errorMessage = "Invalid OTP code. Please try again.";

      if (error.message) {
        if (error.message.toLowerCase().includes('network') ||
            error.message.toLowerCase().includes('connection')) {
          errorMessage = "Connection error. Please check your internet and try again.";
        } else if (error.message.toLowerCase().includes('expired')) {
          errorMessage = "OTP code has expired. Please request a new one.";
        } else if (error.message.toLowerCase().includes('invalid') ||
                   error.message.toLowerCase().includes('incorrect')) {
          errorMessage = "Invalid OTP code. Please check and try again.";
        } else {
          errorMessage = error.message;
        }
      }

      toast({
        title: "Verification Failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResend = async () => {
    if (resendCooldown > 0 || !email) return;

    setIsResending(true);
    setStatus("idle");

    console.log('📧 Requesting new OTP for:', email);

    try {
      const response = await fetchClient("/v1/users/request-otp", {
        method: "POST",
        body: JSON.stringify({ email }),
      });

      console.log('✅ OTP Request Response:', response);

      toast({
        title: "OTP Sent",
        description: `A new OTP code has been sent to ${email}.`,
      });

      // Start cooldown timer (60 seconds)
      setResendCooldown(60);
      const interval = setInterval(() => {
        setResendCooldown((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch (error: any) {
      console.error('❌ OTP Request Error:', error);

      toast({
        title: "Error",
        description: error.message || "Failed to resend OTP code.",
        variant: "destructive",
      });
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-background via-background to-muted/20 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="bg-card border rounded-2xl shadow-2xl p-8 space-y-8">
          {/* Header */}
          <div className="space-y-2 text-center">
            <motion.div
              className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
            >
              <svg
                className="w-8 h-8 text-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </motion.div>

            <motion.h3
              className="text-2xl font-bold"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Enter Verification Code
            </motion.h3>

            <motion.p
              className="text-sm text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              We&apos;ve sent a 6-digit code to
              <br />
              <strong className="text-foreground">{email}</strong>
            </motion.p>
          </div>

          {/* OTP Input */}
          <div className="relative py-4">
            <CreativeOTPInput
              length={6}
              variant="default"
              status={status}
              onComplete={handleComplete}
            />

            <AnimatePresence>
              {status === "error" && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-x-0 -bottom-2 text-center text-sm font-medium text-red-500 dark:text-red-400"
                >
                  Invalid code. Please try again.
                </motion.p>
              )}
              {status === "success" && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-x-0 -bottom-2 text-center text-sm font-medium text-green-500 dark:text-green-400"
                >
                  Verification successful! Redirecting...
                </motion.p>
              )}
              {isVerifying && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-x-0 -bottom-2 text-center text-sm font-medium text-primary"
                >
                  Verifying...
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {/* Resend Button */}
          <motion.div
            className="text-center space-y-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <p className="text-sm text-muted-foreground">
              Didn&apos;t receive the code?
            </p>

            <Button
              variant="outline"
              onClick={handleResend}
              disabled={isResending || resendCooldown > 0}
              className="w-full"
            >
              <RefreshCw className={cn("mr-2 h-4 w-4", isResending && "animate-spin")} />
              {resendCooldown > 0
                ? `Resend in ${resendCooldown}s`
                : isResending
                  ? "Sending..."
                  : "Resend Code"}
            </Button>

            <Button
              variant="ghost"
              onClick={() => router.push("/auth")}
              className="w-full"
            >
              Back to Login
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
