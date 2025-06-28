"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart, Mail, Phone, MapPin, ArrowLeft, Send } from "lucide-react"

export default function ContactUsPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission here
    alert("Thank you for your message! We'll get back to you soon.")
    setFormData({ name: "", email: "", subject: "", message: "" })
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-purple-50 to-pink-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-purple-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-orange-400 to-pink-400 rounded-2xl flex items-center justify-center">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
              MindfulMe
            </span>
          </Link>
          <Link href="/">
            <Button variant="ghost" className="rounded-full">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
            Get in Touch
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We'd love to hear from you! Whether you have questions, feedback, or need support, we're here to help you on
            your mental health journey.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card className="bg-white/80 backdrop-blur-sm border-purple-200 rounded-3xl">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-gray-800">Send us a Message</CardTitle>
              <CardDescription className="text-gray-600">
                Fill out the form below and we'll get back to you as soon as possible.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-gray-700 font-medium">
                      Name
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="rounded-2xl border-purple-200 focus:border-orange-400 focus:ring-orange-400"
                      placeholder="Your full name"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-gray-700 font-medium">
                      Email
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="rounded-2xl border-purple-200 focus:border-orange-400 focus:ring-orange-400"
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject" className="text-gray-700 font-medium">
                    Subject
                  </Label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="rounded-2xl border-purple-200 focus:border-orange-400 focus:ring-orange-400"
                    placeholder="What's this about?"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="text-gray-700 font-medium">
                    Message
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="rounded-2xl border-purple-200 focus:border-orange-400 focus:ring-orange-400 min-h-32"
                    placeholder="Tell us how we can help you..."
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full rounded-2xl bg-gradient-to-r from-orange-400 to-pink-400 hover:from-orange-500 hover:to-pink-500 py-3 text-lg font-medium"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-8">
            <Card className="bg-gradient-to-br from-blue-100 to-purple-100 border-blue-300 rounded-3xl">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-blue-800 mb-6">Contact Information</h3>
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-blue-500 rounded-2xl flex items-center justify-center">
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-blue-800">Email</p>
                      <p className="text-blue-600">support@mindfulme.com</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-green-500 rounded-2xl flex items-center justify-center">
                      <Phone className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-blue-800">Phone</p>
                      <p className="text-blue-600">+1 (555) 123-4567</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-purple-500 rounded-2xl flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-blue-800">Address</p>
                      <p className="text-blue-600">
                        123 Wellness Street
                        <br />
                        Mindful City, MC 12345
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-orange-100 to-pink-100 border-orange-300 rounded-3xl">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-orange-800 mb-4">Office Hours</h3>
                <div className="space-y-2 text-orange-700">
                  <p>
                    <span className="font-medium">Monday - Friday:</span> 9:00 AM - 6:00 PM
                  </p>
                  <p>
                    <span className="font-medium">Saturday:</span> 10:00 AM - 4:00 PM
                  </p>
                  <p>
                    <span className="font-medium">Sunday:</span> Closed
                  </p>
                </div>
                <p className="text-sm text-orange-600 mt-4">
                  * Emergency support is available 24/7 through our crisis hotline
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-100 to-teal-100 border-green-300 rounded-3xl">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-green-800 mb-4">Quick Support</h3>
                <p className="text-green-700 mb-4">
                  Need immediate help? Check out our FAQ section or reach out to our community support.
                </p>
                <div className="space-y-3">
                  <Button
                    variant="outline"
                    className="w-full rounded-2xl border-green-300 hover:bg-green-50 bg-transparent"
                  >
                    View FAQ
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full rounded-2xl border-green-300 hover:bg-green-50 bg-transparent"
                  >
                    Community Support
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
