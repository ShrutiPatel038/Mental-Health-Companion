import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Heart, Users, Target, Shield, ArrowLeft } from "lucide-react"

export default function AboutUsPage() {
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
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 bg-clip-text text-transparent">
            About MindfulMe
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We believe that mental health support should be accessible, positive, and empowering. MindfulMe was created
            to provide a safe space where you can nurture your wellbeing and build resilience through evidence-based
            tools and practices.
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <Card className="bg-gradient-to-br from-orange-100 to-pink-100 border-orange-300 rounded-3xl">
            <CardContent className="p-8">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-400 to-pink-400 rounded-2xl flex items-center justify-center mb-6">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-orange-800 mb-4">Our Mission</h3>
              <p className="text-orange-700 leading-relaxed">
                To make mental health support accessible and engaging for everyone, providing tools that promote
                self-awareness, emotional regulation, and personal growth in a positive, non-judgmental environment.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-100 to-blue-100 border-purple-300 rounded-3xl">
            <CardContent className="p-8">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-blue-400 rounded-2xl flex items-center justify-center mb-6">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-purple-800 mb-4">Our Vision</h3>
              <p className="text-purple-700 leading-relaxed">
                A world where mental health is prioritized, stigma is eliminated, and everyone has the tools and support
                they need to thrive emotionally and live their best life.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Core Values */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
            Our Core Values
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-white/80 backdrop-blur-sm border-purple-200 rounded-3xl hover:transform hover:scale-105 transition-all duration-300">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-blue-400 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-xl font-bold text-gray-800 mb-3">Safety First</h4>
                <p className="text-gray-600">
                  We prioritize creating a safe, secure, and confidential space where you can explore your mental health
                  without judgment.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-purple-200 rounded-3xl hover:transform hover:scale-105 transition-all duration-300">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-pink-400 to-purple-400 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-xl font-bold text-gray-800 mb-3">Inclusivity</h4>
                <p className="text-gray-600">
                  Mental health affects everyone. We're committed to creating tools that work for people of all
                  backgrounds and experiences.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-purple-200 rounded-3xl hover:transform hover:scale-105 transition-all duration-300">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-xl font-bold text-gray-800 mb-3">Empowerment</h4>
                <p className="text-gray-600">
                  We believe in empowering you with knowledge, tools, and confidence to take charge of your mental
                  health journey.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Story Section */}
        <Card className="bg-gradient-to-r from-blue-100 to-purple-100 border-blue-300 rounded-3xl mb-16">
          <CardContent className="p-8">
            <h2 className="text-3xl font-bold text-center mb-8 text-blue-800">Our Story</h2>
            <div className="max-w-4xl mx-auto text-blue-700 leading-relaxed space-y-4">
              <p>
                MindfulMe was born from a simple yet powerful realization: mental health support should be as accessible
                as checking the weather on your phone. Our founders, having experienced their own mental health
                journeys, recognized the gap between traditional therapy and daily self-care.
              </p>
              <p>
                We spent months researching evidence-based practices, consulting with mental health professionals, and
                most importantly, listening to people who needed support. The result is a platform that combines the
                warmth of human understanding with the convenience of modern technology.
              </p>
              <p>
                Today, MindfulMe serves thousands of users worldwide, helping them build resilience, track their
                progress, and find moments of peace in their daily lives. We're not just building an app – we're
                nurturing a community of growth and healing.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of people who are already improving their mental health with MindfulMe. Your wellbeing
            journey starts with a single step.
          </p>
          <div className="flex justify-center space-x-4">
            <Link href="/signup">
              <Button
                size="lg"
                className="rounded-full bg-gradient-to-r from-orange-400 to-pink-400 hover:from-orange-500 hover:to-pink-500 px-8 py-3 text-lg"
              >
                Get Started Today
              </Button>
            </Link>
            <Link href="/contact-us">
              <Button
                variant="outline"
                size="lg"
                className="rounded-full px-8 py-3 text-lg border-2 border-purple-300 hover:bg-purple-100 bg-transparent"
              >
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
